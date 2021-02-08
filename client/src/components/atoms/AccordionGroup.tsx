import * as React from 'react';
import { useState } from 'react';

export type AccordionGroupContextType = {
  expandedId: string | undefined;
  onAccordionPress: (expandButtonId: string) => void;
} | null;

export const AccordionGroupContext = React.createContext<AccordionGroupContextType>(null);

type AccordionGroupProps = {
  /** Id of the currently expanded button */
  currentlyExpandedId?: string;
  children: React.ReactNode;
};

type State = {
  expandedId: string | undefined;
};

/**
 * AccordionGroup controls a group of ExpandButtons. Id prop for ExpandButton is required in order to group to work.
 * In case of nested Expand buttons, the id has to have the following format to work properly: 'grandParentButtonId>parentButtonId>buttonId'
 * At most one ExpandButton will be expanded in given time.
 *
 * ### Usage
 * ```js
 * import * as React from 'react';
 *
 * const MyComponent = () => (
 *   <AccordionGroup>
 *     <ExpandButton buttonValue="Accordion 1" id="1">
 *       {Some content}
 *     </ExpandButton>
 *     <ExpandButton buttonValue="Accordion 2" id="2">
 *       {Some other content}
 *     </ExpandButton>
 *   </AccordionGroup>
 * );
 *
 * export default MyComponent;
 *```
 */
const AccordionGroup = ({ currentlyExpandedId, children }: AccordionGroupProps) => {
  const [state, setState] = useState<State>({ expandedId: undefined });

  const onAccordionPress = (expandButtonId: string) => {
    setState({ expandedId: expandButtonId });
  };

  return (
    <AccordionGroupContext.Provider
      value={{
        expandedId: currentlyExpandedId || state.expandedId,
        onAccordionPress: onAccordionPress,
      }}
    >
      {children}
    </AccordionGroupContext.Provider>
  );
};

export default AccordionGroup;
