import { Tooltip as MUITooltip, TooltipProps, Zoom } from "@mui/material";

export default function Tooltip(props: TooltipProps) {
  return (
    <MUITooltip
      {...props}
      arrow
      TransitionComponent={Zoom}
      enterDelay={1000}>
      {props.children}
    </MUITooltip>
  )
}