import {Button, Form, Stack} from "react-bootstrap";

export const SearchInput = (props) => {
  const {value, handleClear, handleChange, handleSearch} = props;

  return (
    <Stack direction="horizontal" gap={3}>
      <Form.Control
        id="filename"
        value={value}
        onChange={handleChange}
        className="me-auto"
        placeholder="Buscar..."
      />
      <Button variant="secondary" onClick={handleSearch}>Buscar</Button>
      <div className="vr" />
      <Button variant="outline-primary" onClick={handleClear}>Limpiar</Button>
    </Stack>
  )
}