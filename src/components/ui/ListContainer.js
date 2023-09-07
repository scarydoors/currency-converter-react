import { Children } from 'react';

/**
 * Displays children in a stack format, supports loading and error states.
 * @param{React.ReactElement[]} children - list of components
 * @param{React.ReactElement} loadingRender - component to render if in loading state
 * @param{boolean} loading
 * @param{React.ReactElement} errorRender - component to render if in error
 * @param{boolean} error
 */
export default function ListContainer({ children, loadingRender, loading, errorRender, error }) {
  const childrenList = Children.toArray(children);
  return (
    <div class="absolute inset-0 overflow-none flex flex-col justify-end md:justify-center items-center space-y-4 bg-gray-50 p-6">
      {loading && loadingRender}
      {error && errorRender}
      {!(loading || error) &&
       childrenList.map((child, idx) => <div key={idx} class="flex flex-row w-full justify-center">{child}</div>)}
    </div>
  );
}
