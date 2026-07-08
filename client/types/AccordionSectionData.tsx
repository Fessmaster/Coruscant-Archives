export interface LinkableItem {
  title: string,
  url: string
}

export interface AccordionSectionData {
  id: string,
  title: string,
  content: LinkableItem | LinkableItem []
}