import React from 'react'
import { Button } from 'theme-ui'
import { useTabs } from './Tabs'

export const Tab: React.FC<ITabProps> = ({ label, children }) => {
  const { setActiveTab, activeTab } = useTabs()
  const selected = activeTab == label
  return (
    <Button
      sx={{ border: selected ? '2px solid black' : '' }}
      onClick={() => setActiveTab(label)}
    >
      {children}
    </Button>
  )
}

export interface ITabProps {
  label: string
}
