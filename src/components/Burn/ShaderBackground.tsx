import React, { useRef, useEffect } from 'react'
import stitches from "../../stitches"

// Fragment shader code
const fragmentShader = `precision mediump float;

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
varying vec2 v_uv;

#define PI 3.14159265359
#define NUM_SPARKS 45.0

float rand(vec2 n) { 
    return fract(sin(dot(n, vec2(12.9898, 4.1414))) * 43758.5453);
}

float noise(vec2 p) {
    vec2 ip = floor(p);
    vec2 u = fract(p);
    u = u*u*(3.0-2.0*u);
    
    float res = mix(
        mix(rand(ip), rand(ip+vec2(1.0,0.0)), u.x),
        mix(rand(ip+vec2(0.0,1.0)), rand(ip+vec2(1.0,1.0)), u.x), u.y);
    return res*res;
}

float fbm(vec2 x) {
    float v = 0.0;
    float a = 0.5;
    vec2 shift = vec2(100.0);
    mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
    for (int i = 0; i < 6; ++i) {
        v += a * noise(x);
        x = rot * x * 2.0 + shift;
        a *= 0.5;
    }
    return v;
}

// Magical smoke function
float magicalSmoke(vec2 uv, float time) {
    // Create vertical movement
    vec2 smokeCoord = uv * vec2(2.0, 1.0) + vec2(0.0, -time * 0.2);
    
    // Add swirling effect
    float swirl = sin(uv.x * 4.0 + time) * 0.1;
    smokeCoord.x += swirl;
    
    // Create smoke density with noise layers
    float noise1 = fbm(smokeCoord * 3.0);
    float noise2 = fbm(smokeCoord * 5.0 + vec2(time * 0.1, 0.0));
    
    // Combine noise layers for details
    float smokeDensity = noise1 * 0.6 + noise2 * 0.4;
    
    // Remove the height fadeout to allow smoke to flow naturally through the top
    // Original: float fadeOut = smoothstep(0.0, 1.5, uv.y);
    // Original: smokeDensity *= (1.0 - fadeOut) * (0.8 + 0.2 * sin(time + uv.x * 5.0));
    
    // New: Just add the subtle movement without fading out with height
    smokeDensity *= (0.8 + 0.2 * sin(time + uv.x * 5.0));
    
    return smokeDensity;
}

// Phoenix wings effect
float phoenixWings(vec2 uv, float time) {
    // Create wing curve
    float leftWing = smoothstep(0.0, 0.5, -uv.x) * smoothstep(-0.8, -0.1, uv.x);
    float rightWing = smoothstep(0.0, 0.5, uv.x) * smoothstep(0.8, 0.1, uv.x);
    
    // Combine wings with vertical falloff
    float wings = (leftWing + rightWing) * smoothstep(-0.1, 0.6, uv.y) * smoothstep(1.2, 0.2, uv.y);
    
    // Add subtle movement
    wings *= 0.9 + 0.1 * sin(time * 1.5 + uv.y * 2.0);
    
    // Add feather pattern with controlled noise
    vec2 featherCoord = uv * vec2(3.0, 4.0) + vec2(0.0, time * 0.1);
    float featherDetail = fbm(featherCoord);
    
    return wings * (0.5 + 0.5 * featherDetail) * 0.2; // Subtle effect
}

// Spark effect for phoenix embers
float sparkEffect(vec2 uv, float time) {
    float sparks = 0.0;
    
    for (float i = 0.0; i < NUM_SPARKS; i++) {
        // Create a unique seed for each spark
        float seed = i * 43.758 + 1.0;
        
        // Lifecycle of the spark
        float sparkTime = fract(time * 0.8 + rand(vec2(seed, seed+1.0)));
        
        // Initial direction
        float angle;
        if (mod(i, 2.0) < 1.0) {
            // Left spray (120-170 degrees)
            angle = PI * (0.67 + 0.28 * rand(vec2(seed, seed+2.0)));
        } else {
            // Right spray (10-60 degrees)
            angle = PI * (0.05 + 0.28 * rand(vec2(seed, seed+3.0)));
        }
        
        // Initial velocity components
        float initialSpeed = 2.0 + 3.0 * rand(vec2(seed, seed+4.0));
        float vx = cos(angle) * initialSpeed;
        float vy = sin(angle) * initialSpeed;
        
        // Gravity effect
        float gravity = 3.0 + rand(vec2(seed, seed+5.0)) * 2.0;
        
        // Position with physics
        float xPos = vx * sparkTime;
        float yPos = vy * sparkTime - 0.5 * gravity * sparkTime * sparkTime;
        
        // Add bounce effect
        float bounceFactor = 0.4 + 0.4 * rand(vec2(seed, seed+6.0));
        if (yPos < -0.2) {
            float bounceTime = (sparkTime - (-vy - sqrt(vy*vy - 2.0*gravity*(-0.2))) / gravity);
            if (bounceTime > 0.0) {
                float vyAfterBounce = sqrt(2.0 * gravity * 0.2) * bounceFactor;
                yPos = -0.2 + vyAfterBounce * bounceTime - 0.5 * gravity * bounceTime * bounceTime;
                xPos = vx * (sparkTime - bounceTime) + vx * 0.7 * bounceTime;
            }
        }
        
        // Add subtle variation
        float turbulence = 0.05 * rand(vec2(seed+7.0, time));
        xPos += sin(sparkTime * 20.0 + seed) * turbulence;
        
        // Center the effect
        xPos += rand(vec2(seed, 0.0)) * 0.2 - 0.1;
        
        // Spark trail effect
        float trailLength = 0.1 * initialSpeed * sparkTime;
        vec2 velocity = vec2(vx, vy - gravity * sparkTime);
        vec2 direction = normalize(velocity);
        
        // Calculate distance to line segment
        vec2 sparkPos = vec2(xPos, yPos);
        vec2 trailEnd = sparkPos - direction * trailLength * (1.0 - sparkTime);
        
        vec2 pa = uv - sparkPos;
        vec2 ba = trailEnd - sparkPos;
        float h = clamp(dot(pa, ba) / dot(ba, ba), 0.0, 1.0);
        float sparkDist = length(pa - ba * h);
        
        // Dynamic size
        float size = 0.003 + 0.007 * rand(vec2(seed+2.0, seed)) * (1.0 - sparkTime);
        
        // Core and trail with sharp definition
        float sparkCore = smoothstep(size * 0.5, 0.0, length(uv - sparkPos));
        float sparkTrail = smoothstep(size * (1.0 + trailLength * 2.0), 0.0, sparkDist) * (1.0 - h) * 0.6;
        
        // Sharp falloff for clarity
        float sparkOpacity = smoothstep(0.9, 0.0, sparkTime) * (1.0 + 0.3 * sin(sparkTime * 10.0));
        
        // Add the spark with enhanced brightness
        sparks += (sparkCore * 2.5 + sparkTrail) * sparkOpacity;
    }
    
    return min(sparks, 1.0);
}

// Flame function
float flame(vec2 uv, float time, float distortion) {
    // Create base shape for the flame
    float y = 1.0 - pow(uv.y, 0.5);
    
    // Add horizontal narrowing
    float x = exp(-pow(uv.x * 3.0, 2.0));
    
    // Create flame movement with noise
    vec2 noiseCoord = uv * vec2(3.0, 5.0) + vec2(0.0, time * 0.8);
    float noise1 = fbm(noiseCoord);
    
    // Add distortion based on noise
    float distortedX = x * (1.0 + distortion * (noise1 - 0.5));
    
    // Create flame shape with distortion
    float flame = y * distortedX;
    
    // Add detail with noise
    vec2 detailCoord = uv * vec2(8.0, 12.0) + vec2(time * 0.3, time * 1.2);
    float detail = fbm(detailCoord) * 0.5;
    
    // Combine base flame with detail
    flame = flame + detail * flame;
    
    // Add subtle pulsing
    flame *= 1.0 + 0.15 * sin(time * 2.0);
    
    return clamp(flame, 0.0, 1.0);
}

// Psychedelic flame colors
vec3 flameColor(float intensity, float time) {
    // Base colors for psychedelic flame
    vec3 purple = vec3(0.6, 0.0, 0.8);
    vec3 pink = vec3(1.0, 0.0, 0.5);
    vec3 blue = vec3(0.0, 0.5, 1.0);
    vec3 green = vec3(0.0, 1.0, 0.5);
    vec3 yellow = vec3(1.0, 0.8, 0.0);
    vec3 orange = vec3(1.0, 0.4, 0.0); // Phoenix orange
    
    // Color oscillation
    float t1 = sin(time * 0.5) * 0.5 + 0.5;
    float t2 = sin(time * 0.3 + 1.0) * 0.5 + 0.5;
    float t3 = sin(time * 0.7 + 2.0) * 0.5 + 0.5;
    
    // Start with base color
    vec3 color = mix(purple, pink, t1 * 0.8);
    
    // Layer with controlled blending
    color = mix(color, blue, t2 * (1.0 - intensity) * 0.6);
    color = mix(color, green, t3 * (1.0 - intensity) * 0.3);
    
    // Add phoenix colors in high intensity areas
    color = mix(color, orange, pow(intensity, 1.5) * 0.7);
    color = mix(color, yellow, pow(intensity, 2.0));
    
    return color;
}

// Phoenix smoke colors
vec3 phoenixSmokeColor(float density, float time, vec2 uv) {
    // Phoenix theme colors
    vec3 purple = vec3(0.4, 0.0, 0.6);
    vec3 teal = vec3(0.0, 0.7, 0.7);
    vec3 gold = vec3(1.0, 0.7, 0.2);
    vec3 red = vec3(0.9, 0.1, 0.1);
    
    // Controlled color variation
    float t1 = sin(time * 0.3 + uv.x * 2.0) * 0.5 + 0.5;
    float t2 = cos(time * 0.4 + uv.y * 2.0) * 0.5 + 0.5;
    
    // Base color with sharp transitions
    vec3 color = mix(purple, teal, t1 * 0.7);
    
    // Add phoenix theme
    color = mix(color, red, t2 * 0.4);
    
    // Gold highlights at edges for phoenix feather effect
    float edge = fbm(uv * 6.0 + time * 0.1);
    color = mix(color, gold, edge * 0.3);
    
    return color;
}

// Spark colors for phoenix embers
vec3 sparkColor(float intensity, float time) {
    // Phoenix ember colors
    vec3 coreColor = vec3(1.0, 1.0, 0.9); // Slightly golden white
    vec3 midColor = vec3(1.0, 0.7, 0.1);  // Gold
    vec3 outerColor = vec3(1.0, 0.3, 0.0); // Phoenix orange-red
    
    // Sharp color transitions
    float pulse = 0.8 + 0.2 * sin(time * 5.0 + intensity * 10.0);
    
    // Layered colors with defined boundaries
    vec3 color = mix(outerColor, midColor, smoothstep(0.3, 0.7, intensity));
    color = mix(color, coreColor, smoothstep(0.7, 0.9, intensity) * pulse);
    
    // Boost brightness for visibility
    color *= 1.7;
    
    return color;
}

void main() {
    // Set background color
    vec3 bgColor = vec3(0.05, 0.0, 0.1);
    
    // Correct handling of screen coordinates
    vec2 uv = v_uv;
    
    // Create centered coordinates with proper aspect ratio
    float aspect = u_resolution.x / u_resolution.y;
    vec2 p = vec2((uv.x - 0.5) * aspect, (1.0 - uv.y) - 0.5);
    
    // Create a screen-edge mask but with no top cutoff
    float edgeDistance = smoothstep(0.0, 0.1, 1.0 - abs(uv.x * 2.0 - 1.0));
    
    // Adjust p to center flames
    p.y += 0.5;
    
    // Mouse interaction
    vec2 mousePos = vec2(u_mouse.x - 0.5, 1.0 - u_mouse.y);
    float mouseDist = length(p - mousePos);
    float mouseInfluence = smoothstep(0.5, 0.0, mouseDist);
    
    // Flames
    float flameIntensity = 0.0;
    
    // Main flame
    vec2 flamePos = vec2(0.0, 0.0);
    vec2 flameUv = vec2(p.x - flamePos.x, p.y - flamePos.y) * vec2(1.0, 1.2);
    float distortion = 0.8 + mouseInfluence * 0.5;
    flameIntensity += flame(vec2(flameUv.x * 2.0, flameUv.y), u_time, distortion);
    
    // Side flames
    float sideFlameSize = 0.8 + mouseInfluence * 0.2;
    vec2 leftFlamePos = vec2(-0.2, 0.05);
    vec2 leftFlameUv = (vec2(p.x - leftFlamePos.x, p.y - leftFlamePos.y) * vec2(1.0, 1.0)) / sideFlameSize;
    flameIntensity += flame(vec2(leftFlameUv.x * 2.0, leftFlameUv.y), u_time * 1.1, distortion) * 0.7;
    
    vec2 rightFlamePos = vec2(0.2, 0.05);
    vec2 rightFlameUv = (vec2(p.x - rightFlamePos.x, p.y - rightFlamePos.y) * vec2(1.0, 1.0)) / sideFlameSize;
    flameIntensity += flame(vec2(rightFlameUv.x * 2.0, rightFlameUv.y), u_time * 0.9, distortion) * 0.7;
    
    // Prevent flames from showing at the top of the screen
    flameIntensity *= smoothstep(1.0, 0.8, uv.y);
    
    // Phoenix wing effect
    float phoenixWingEffect = phoenixWings(vec2(p.x, p.y - 0.1), u_time);
    
    // Calculate sparks
    vec2 sparkUv = vec2(p.x, p.y - 0.1);
    float sparkIntensity = sparkEffect(sparkUv, u_time);
    
    // Calculate smoke with full coverage
    vec2 smokeUv = vec2(p.x, p.y - 0.5);
    float smokeDensity = magicalSmoke(smokeUv, u_time);
    
    // Create the final color
    // Start with flame color
    vec3 color = flameColor(flameIntensity, u_time) * flameIntensity;
    
    // Add phoenix wing effect
    vec3 wingColor = mix(vec3(1.0, 0.3, 0.0), vec3(1.0, 0.7, 0.1), 0.5 + 0.5 * sin(u_time * 0.7));
    color = mix(color, wingColor, phoenixWingEffect * 0.7);
    
    // Add smoke with phoenix colors - FIXED: removed vertical constraint and modified blend factors
    vec3 smokeCol = phoenixSmokeColor(smokeDensity, u_time, smokeUv);
    // Removed the conditional check (if p.y > 0.2) to allow smoke to flow everywhere
    // Changed the vertical fade to be more gradual, ensuring it covers more area
    float smokeMix = smokeDensity * 0.7;
    color = mix(color, smokeCol, smokeMix);
    
    // Add sparks
    vec3 sparkCol = sparkColor(sparkIntensity, u_time);
    color = mix(color, color + sparkCol, sparkIntensity);
    
    // Mix with background based on total intensity
    color = mix(bgColor, color, clamp(flameIntensity + smokeDensity * 0.5 + sparkIntensity, 0.0, 1.0));
    
    // Apply only horizontal edge fading to maintain vertical coverage
    color = mix(bgColor, color, edgeDistance);
    
    gl_FragColor = vec4(color, 1.0);
}`;

// Simple vertex shader
const vertexShader = `
attribute vec2 a_position;
varying vec2 v_uv;

void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
  v_uv = a_position * 0.5 + 0.5;
}`;

// Square vertices (2 triangles)
const vertices = [
  -1.0, -1.0, 
   1.0, -1.0, 
  -1.0,  1.0, 
  -1.0,  1.0, 
   1.0, -1.0, 
   1.0,  1.0
];

// Styled canvas container
const ShaderCanvas = stitches.styled('canvas', {
  position: 'absolute',
  top: 0,
  left: 0,
  width: '100%',
  height: '100%',
  zIndex: 0
});

interface ShaderBackgroundProps {
  className?: string;
}

const ShaderBackground: React.FC<ShaderBackgroundProps> = ({ className }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>(0);
  const mouseRef = useRef({ x: 0.5, y: 0.5 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Initialize WebGL context
    const gl = canvas.getContext('webgl');
    if (!gl) {
      console.error('WebGL not supported');
      return;
    }

    // Handle resize
    const handleResize = () => {
      if (canvas && gl) {
        // Set display size (css pixels)
        canvas.style.width = '100%';
        canvas.style.height = '100%';
        
        // Set actual size in memory (scaled to account for extra pixel density)
        const pixelRatio = window.devicePixelRatio || 1;
        canvas.width = canvas.clientWidth * pixelRatio;
        canvas.height = canvas.clientHeight * pixelRatio;
        
        // Set viewport to match
        gl.viewport(0, 0, canvas.width, canvas.height);
      }
    };

    // Track mouse movement
    const handleMouseMove = (e: MouseEvent) => {
      if (canvas) {
        mouseRef.current = {
          x: e.clientX / canvas.clientWidth,
          y: e.clientY / canvas.clientHeight
        };
      }
    };

    // Create shader program
    const program = gl.createProgram();
    if (!program) {
      console.error('Failed to create WebGL program');
      return;
    }

    // Compile vertex shader
    const vertShader = gl.createShader(gl.VERTEX_SHADER);
    if (!vertShader) {
      console.error('Failed to create vertex shader');
      return;
    }
    gl.shaderSource(vertShader, vertexShader);
    gl.compileShader(vertShader);
    if (!gl.getShaderParameter(vertShader, gl.COMPILE_STATUS)) {
      console.error('Vertex shader compilation failed:', gl.getShaderInfoLog(vertShader));
      return;
    }
    gl.attachShader(program, vertShader);

    // Compile fragment shader
    const fragShader = gl.createShader(gl.FRAGMENT_SHADER);
    if (!fragShader) {
      console.error('Failed to create fragment shader');
      return;
    }
    gl.shaderSource(fragShader, fragmentShader);
    gl.compileShader(fragShader);
    if (!gl.getShaderParameter(fragShader, gl.COMPILE_STATUS)) {
      console.error('Fragment shader compilation failed:', gl.getShaderInfoLog(fragShader));
      return;
    }
    gl.attachShader(program, fragShader);

    // Link program
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      console.error('Shader program linking failed:', gl.getProgramInfoLog(program));
      return;
    }
    gl.useProgram(program);

    // Create position buffer
    const positionBuffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);

    // Enable position attribute
    const positionAttributeLocation = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(positionAttributeLocation);
    gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);

    // Get uniform locations
    const timeUniformLocation = gl.getUniformLocation(program, 'u_time');
    const resolutionUniformLocation = gl.getUniformLocation(program, 'u_resolution');
    const mouseUniformLocation = gl.getUniformLocation(program, 'u_mouse');

    // Init time
    const startTime = Date.now();

    // Animation loop
    const animate = () => {
      // Update time
      const currentTime = Date.now();
      const time = (currentTime - startTime) / 1000.0; // Convert to seconds

      // Update canvas size if needed (handles window resize)
      if (canvas.width !== canvas.clientWidth * window.devicePixelRatio ||
          canvas.height !== canvas.clientHeight * window.devicePixelRatio) {
        handleResize();
      }

      // Clear canvas
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT);

      // Update uniforms
      gl.uniform1f(timeUniformLocation, time);
      gl.uniform2f(resolutionUniformLocation, canvas.width, canvas.height);
      gl.uniform2f(mouseUniformLocation, mouseRef.current.x, mouseRef.current.y);

      // Draw
      gl.drawArrays(gl.TRIANGLES, 0, vertices.length / 2);

      // Request next frame
      animationRef.current = requestAnimationFrame(animate);
    };

    // Start rendering
    handleResize();
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animationRef.current = requestAnimationFrame(animate);

    // Cleanup on unmount
    return () => {
      cancelAnimationFrame(animationRef.current);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      gl.deleteShader(vertShader);
      gl.deleteShader(fragShader);
      gl.deleteProgram(program);
    };
  }, []);

  return <ShaderCanvas ref={canvasRef} className={className} />;
};

export default ShaderBackground;
