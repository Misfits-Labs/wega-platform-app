import React from 'react';
import { BarWrapper , BarHeaderColumn } from './types';
import 'twin.macro';

export const GameBarHeader: React.FC<React.Attributes> = (props: React.Attributes) => <BarWrapper tw="grid grid-cols-4 px-3" { ...props }>
  <BarHeaderColumn>Date created</BarHeaderColumn>
  <BarHeaderColumn>Game</BarHeaderColumn>
  <BarHeaderColumn>Wager</BarHeaderColumn>
</BarWrapper>   