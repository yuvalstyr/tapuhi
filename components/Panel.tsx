import React from 'react'
import { Box } from 'theme-ui'
import { useTabs } from './Tabs'

export const Panel: React.FC<IPanelProps> = ({ label, children }) => {
  const { activeTab } = useTabs()
  return activeTab === label ? <Box>{children}</Box> : null
}

export interface IPanelProps {
  label: string
}
