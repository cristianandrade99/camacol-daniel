import { Table, Form } from 'react-bootstrap';

const getCheckboxes = (checkboxOptions, data, setData, row) =>
  checkboxOptions.map(([id, label]) => {
    const currentValues = data[row.id] || [];
    const isChecked = currentValues?.includes(+id) || false;
    return (
      <div>
        <Form.Check
          type='checkbox'
          label={label}
          checked={isChecked}
          onChange={() => {
            setData(prev => {
              let newValues;
              if (isChecked) {
                newValues = currentValues.filter(item => item !== +id);
              } else {
                newValues = [...currentValues, +id];
              }
              const updatedState = { ...prev, [row.id]: newValues };
              return updatedState;
            });
          }}
        />
      </div>
    );
  });

const InnerExternalCheckboxes = ({ originalFields, data, setData }) => {
  return (
    <div className='acordeon-body'>
      <div id='acabados' className='table-responsive'>
        <Table striped bordered hover>
          <thead>
            <tr>
              {['Id', 'Nombre', 'Residencial', 'No residencial'].map(label => (
                <th key={label}>
                  <strong>{label}</strong>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {originalFields.map(row => {
              const isResidencial = !Array.isArray(row.residencial);
              const checkboxOptions = Object.entries(row[isResidencial ? 'residencial' : 'noResidencial']);
              return (
                <tr key={row.id}>
                  <td>{row.categoria}</td>
                  <td>{row.nombre}</td>
                  <td>{isResidencial && getCheckboxes(checkboxOptions, data, setData, row)}</td>
                  <td>{!isResidencial && getCheckboxes(checkboxOptions, data, setData, row)}</td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
    </div>
  );
};

export default InnerExternalCheckboxes;
