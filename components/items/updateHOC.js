export const updateHOC = (Component) => {
  return (props) => {
    return <Component {...props} />;
  };
};
