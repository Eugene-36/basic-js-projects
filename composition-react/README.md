# Getting Started with Create React App

The core React development and decomposition rules that I like to follow, and the more I code, the more strongly I feel about them, are:
 - always start implementation from the top
 - extract components only when there is an actual need for it
 - always start from “simple” components, introduce other composition techniques only when there is an actual need for them

 # And the very first rule for when a component needs to be decomposed into smaller ones is when a component is too
  big. A good size for a component for me is when it can fit on the screen of my laptop entirely. If I need to scroll to read through the component’s code - it’s a clear sign that it’s too big.


Container wrapper
  If I wanted to summarise the rule in just one sentence, it could be this: extract Container components when there is a need to share some visual or behavioural logic that wraps elements that still need to be under “consumer” control.