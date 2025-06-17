import React, { FC } from "react"
import stitches from "../../stitches"
import * as Select from "@radix-ui/react-select"
import { ChevronDownIcon } from "@radix-ui/react-icons"

const SelectTrigger = stitches.styled(Select.Trigger, {
  all: "unset",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  borderRadius: "10px",
  padding: "$sm",
  gap: "$sm",
  backgroundColor: "$paMoonLight",
  color: "$paLupine",
  boxShadow: `0 2px 10px $paMid`,
  "&:hover": { backgroundColor: "$paMoonLight" },
  "&:focus": { boxShadow: `0 0 0 2px $paMid` },
  "&[data-placeholder]": { color: "$paLupine" },
})

const SelectContent = stitches.styled(Select.Content, {
  backgroundColor: "$paMoonLight",
  borderRadius: "10px",
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
  zIndex: "$tooltip",
})

const SelectItem = stitches.styled(Select.Item, {
  all: "unset",
  fontSize: "$rg",
  fontFamily: "$inter",
  color: "$paLupine",
  display: "flex",
  alignItems: "center",
  padding: "$sm",
  position: "relative",
  userSelect: "none",

  "&[data-highlighted]": {
    backgroundColor: "$paLupine",
    color: "$paMoonLight",
  },
})

interface Props {
  onChange: (val: any) => void
  items: Array<{ label: string; value: string }>
  placeholder: string
  value?: string
}

export const SelectComponent: FC<Props> = ({
  value,
  placeholder,
  onChange,
  items,
}) => {
  return (
    <Select.Root onValueChange={onChange} value={value}>
      <SelectTrigger aria-label="Token Type">
        <Select.Value placeholder={placeholder} />
        <Select.Icon>
          <ChevronDownIcon />
        </Select.Icon>
      </SelectTrigger>
      <Select.Portal>
        <SelectContent>
          <Select.ScrollUpButton />
          <Select.Viewport>
            {items.map((item) => (
              <SelectItem key={item.value} value={item.value}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </SelectItem>
            ))}
          </Select.Viewport>
          <Select.ScrollDownButton />
        </SelectContent>
      </Select.Portal>
    </Select.Root>
  )
}
