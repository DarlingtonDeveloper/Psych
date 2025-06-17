import React, { FC, useCallback } from "react"
import {
  ChartMaxWidth,
  ChartMobileLabel,
  ChartMobileLabelList,
  ChartMobilePercentage,
  ChartPanel,
  EllipseWithLabel,
  InnerEllipse,
  LabelWrapper,
  OuterEllipse,
  RelativeEllipse,
  TextGroup,
  TextSVG,
} from "./styles"
import { getATOWalletUIFromData } from "./utils"
import stitches from "../../stitches"
import { PieChart } from "react-minimal-pie-chart"

interface Props {
  wallets: Array<{ id: string; value: number }>
  webNavigator?: Navigator
  total?: number
}

export const ATODashboard: FC<Props> = ({ wallets, webNavigator, total }) => {
  const formatNumber = useCallback(
    (value) => {
      return new Intl.NumberFormat(webNavigator?.language || "en-AU").format(
        value
      )
    },
    [webNavigator]
  )

  return (
    <ChartPanel>
      <ChartMobileLabelList>
        {wallets.map((val) => {
          const uiProps = getATOWalletUIFromData(val)

          return (
            <div key={val.id}>
              <LabelWrapper>
                <EllipseWithLabel>
                  <RelativeEllipse>
                    <OuterEllipse ellipseColor={uiProps?.cardColor} />
                    <InnerEllipse ellipseColor={uiProps?.cardColor} />
                  </RelativeEllipse>
                  <ChartMobileLabel>{uiProps?.title}</ChartMobileLabel>
                </EllipseWithLabel>
                <ChartMobilePercentage>
                  {total && val.value
                    ? Math.round((val.value / total) * 100) + "%"
                    : "0%"}
                </ChartMobilePercentage>
              </LabelWrapper>
            </div>
          )
        })}
      </ChartMobileLabelList>
      <ChartMaxWidth>
        <PieChart
          rounded
          lineWidth={15}
          radius={40}
          labelPosition={120}
          viewBoxSize={[100, 100]}
          label={({ dataEntry, x, y, dx, dy }) => {
            const everyWalletIsZero = wallets.every((val) => !val.value)
            if (everyWalletIsZero) {
              return null
            }

            const isOnRightSideOfPie = dx > 15
            const isOnBottomOfPie = dy > 20
            return (
              <TextGroup id={`${dataEntry.title}-text-group`}>
                <text
                  x={isOnRightSideOfPie ? x + 20 : x - 10}
                  y={isOnBottomOfPie ? y + 6 : y - 6}
                  dx={dx}
                  dy={dy}
                  overflow="visible"
                  dominantBaseline="central"
                  textAnchor={isOnRightSideOfPie ? "end" : "start"}
                  fontSize="5px"
                  fill={stitches.theme.colors.paLupine.value}
                  fontFamily={stitches.theme.fonts.inter.value}
                >
                  {dataEntry.title}
                </text>
                <text
                  x={isOnRightSideOfPie ? x + 20 : x - 10}
                  y={y}
                  dx={dx}
                  dy={dy}
                  overflow="visible"
                  dominantBaseline="central"
                  textAnchor={isOnRightSideOfPie ? "end" : "start"}
                  fontSize="5px"
                  fill={stitches.theme.colors.paLupine.value}
                  fontFamily={stitches.theme.fonts.inter.value}
                >
                  {Math.round(dataEntry.percentage) + "%"}
                </text>
              </TextGroup>
            )
          }}
          labelStyle={() => ({
            fill: stitches.theme.colors.paLupine.value,
            fontSize: "5px",
            fontFamily: stitches.theme.fonts.inter.value,
          })}
          data={wallets.map((val) => {
            const uiProps = getATOWalletUIFromData(val)
            return {
              title: uiProps!.title,
              color: uiProps!.chartColor,
              value: uiProps!.value,
            }
          })}
        >
          <TextSVG
            x="50%"
            y="45"
            dx="0"
            dy="0"
            fontSize="0.59rem"
            dominantBaseline="central"
            textAnchor="middle"
            fontWeight="600"
            fill={stitches.theme.colors.paLupine.value}
            fontFamily={stitches.theme.fonts.inter.value}
          >
            {formatNumber(total || 0)}
          </TextSVG>
          <TextSVG
            x="50"
            y="54"
            dx="0"
            dy="0"
            fontSize="0.2rem"
            fontWeight="600"
            dominantBaseline="central"
            textAnchor="middle"
            fill={stitches.theme.colors.paLupine.value}
            fontFamily={stitches.theme.fonts.inter.value}
          >
            TOTAL WALLETS
          </TextSVG>
        </PieChart>
      </ChartMaxWidth>
    </ChartPanel>
  )
}
