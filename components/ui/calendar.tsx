"use client"

import * as React from "react"
import { DayPicker } from "react-day-picker"
import "react-day-picker/style.css"

export function Calendar(props: React.ComponentProps<typeof DayPicker>) {
  return (
    <div className="p-3">
      <DayPicker showOutsideDays {...props} />
    </div>
  )
}
