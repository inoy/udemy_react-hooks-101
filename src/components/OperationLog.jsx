const OperationLog = (props) => {
  const { description, operated_at } = props.operationLog;

  return (
    <tr>
      <td>{description}</td>
      <td>{operated_at}</td>
    </tr>
  );
};

export default OperationLog;
