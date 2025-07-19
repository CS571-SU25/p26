this folder is used for components/js files (which aren't components) related to any contexts we may need. 
If multiple components need access to the same dynamicly changing information, instead of passing props down through many layers 
(prop drilling), we can define a context here. Components that need the shared data can then use useContext to access it directly.
This is both good practice for readability and can help avoid unnecessary rerenders in components that don’t use the data but still 
receive it as a prop, just because it was passed down for prop drilling purpose, especially in deeply nested component trees. The prop 
would cause them to re-render if it changed, even though they don’t actually use it.

