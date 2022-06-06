import React from "react";
import Player from "../enums/player";

interface SquareProps {
    setValue: any
    value: Player
    ariaLabel: string
}

export const Square = ({ setValue, value, ariaLabel }: SquareProps ) => <button
  onClick={setValue}
  title={value ? '' : 'click to claim'} className="square"
  aria-label={ariaLabel}
>
    {value || '\u00A0'}
</button>
