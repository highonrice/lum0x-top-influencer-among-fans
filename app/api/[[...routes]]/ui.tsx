/** @jsxImportSource frog/jsx */
import { createSystem, colors } from "frog/ui";

export const {
  Box,
  Columns,
  Column,
  Heading,
  HStack,
  Rows,
  Row,
  Spacer,
  Text,
  VStack,
  vars,
} = createSystem({
  colors: {
    black: "#000000",
    white: "#FFFFFF",
  },
  fonts: {
    default: [
      {
        name: 'Poppins',
        source: 'google',
        weight: 900,
      },
    ]
  },
})
