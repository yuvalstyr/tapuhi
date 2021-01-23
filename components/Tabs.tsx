import React from 'react'
import { Tab, ITabProps } from './Tab'
import { Panel, IPanelProps } from './Panel'

interface ITabsComposition {
  Tab: React.FC<ITabProps>
  Panel: React.FC<IPanelProps>
}

interface ITabsContext {
  activeTab: string
  // eslint-disable-next-line no-unused-vars
  setActiveTab: (label: string) => void
}

export const Tabs: React.FC & ITabsComposition = ({ children }) => {
  const [activeTab, setActiveTab] = React.useState('')
  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      {children}
    </TabsContext.Provider>
  )
}

Tabs.Tab = Tab
Tabs.Panel = Panel

const TabsContext = React.createContext<ITabsContext | undefined>(undefined)

export const useTabs = (): ITabsContext => {
  const context = React.useContext(TabsContext)
  if (!context) {
    throw new Error('This component must be used within a <Tabs> component.')
  }
  return context
}
