import {Spinner, Table} from "react-bootstrap";

export const SimpleTable = (props) => {
  const {
    data = [],
    headers = [],
    loading = false,
  } = props;

  const getItemsFromLine = (objectItem) => {
    const tagsTD = [];
    let idx = 0;

    for (const key in objectItem) {
      if (objectItem.hasOwnProperty(key)) {
        tagsTD.push(<td key={++idx}>{objectItem[key]}</td>)
      }
    }
    return tagsTD;
  }

  return (
    <Table responsive bordered hover size>
      <thead>
      <tr>
        {headers.map(item => {
          return (
            <th key={item}>{item}</th>
          )
        })}
      </tr>
      </thead>
      <tbody>
      {!loading && data.map(item => {
        return [
          <tr key={3}>
            {getItemsFromLine(item)}
          </tr>
        ]
      })}
      {loading && (
        <tr>
          <td colSpan={4} className={"text-center"}><Spinner animation="grow" /></td>
        </tr>
      )}
      </tbody>
    </Table>
  )
}