import React from 'react';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import {Table, Button, Container, Modal, ModalBody, ModalHeader, FormGroup, ModalFooter} from 'reactstrap';

const data = [
  {id: 1, contacto: "Raul", telefono: "829-781-1648"},
  {id: 2, contacto: "Emmanuel", telefono: "829-366-7648"},
];

class App extends React.Component {
  state={
    data: data,
    form:{
      id: '',
      contacto: '',
      telefono: ''
    },
    modalInsertar: false,
    modalEditar: false,
  }
  handleChange=e=>{
this.setState({
  form:{
    ...this.state.form,
    [e.target.name]: e.target.value,
  }
});
  }

mostrarModalInsertar=()=>{
  this.setState({modalInsertar: true});
}

ocultarModalInsertar=()=>{
  this.setState({modalInsertar: false});
}

mostrarModalEditar=(registro)=>{
  this.setState({modalEditar: true, form: registro});
}

ocultarModalEditar=()=>{
  this.setState({modalEditar: false});
}

insertar=()=>{
  var valorNuevo={...this.state.form};
  valorNuevo.id=this.state.data.length+1;
  var lista=this.state.data;
  lista.push(valorNuevo);
  this.setState({data: lista, modalInsertar: false});
}

editar=(dato)=>{
  var contador=0; 
  var lista=this.state.data;
  lista.map((registro)=>{
    if(dato.id===registro.id){
      lista[contador].contacto=dato.contacto;
      lista[contador].telefono=dato.telefono;
    }
    contador++;
  });
  this.setState({data: lista, modalEditar: false});
}

eliminar=(dato)=>{
  var opcion=window.confirm("¿Realmente desea eliminar este contacto?"+dato.id);
  if(opcion){
    var contador=0;
    var lista=this.state.data;
    lista.map((registro)=>{
      if(registro.id===dato.id){
        lista.splice(contador, 1);
      }
      contador++;
    });
    this.setState ({data: lista});
  }
}

  render(){
  return (
    <>
    <h1>Agenda de contactos</h1>
    <Container>
    <br />
      <Button color="primary" onClick={()=>this.mostrarModalInsertar()}>Agregar nuevo Contacto</Button>
      <br /><br />
      <h3>Contactos</h3>
      <br/>
      <Table>
        <thead><tr><th>Id</th>
        <th>Contacto</th>
        <th>Telefono</th>
        <th>Acciones</th></tr></thead>
        <tbody>
          {this.state.data.map((elemento)=>(
            <tr>
              <td>{elemento.id}</td>
              <td>{elemento.contacto}</td>
              <td>{elemento.telefono}</td>
              <td><Button color="primary" onClick={()=>this.mostrarModalEditar(elemento)}>Editar</Button>{" "}
              <Button color="danger" onClick={()=>this.eliminar(elemento)}>Borrar</Button></td>{" "}
            </tr>
          ))}

        </tbody>
      </Table>

      </Container>
      
      <Modal isOpen={this.state.modalInsertar}>
        <ModalHeader>
          <div>
            <h3>Insertar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className="form-control" readOnly type="text" value={this.state.data.length+1}/>
          </FormGroup>

          <FormGroup>
            <label>Contacto</label>
            <input className="form-control" name="contacto" type="text" onChange={this.handleChange}/>
          </FormGroup>

          <FormGroup>
            <label>Telefono</label>
            <input className="form-control" name="telefono" type="text" onChange={this.handleChange}/>
          </FormGroup>

          <ModalFooter>
            <Button color="success" onClick={()=>this.insertar()}>Agregar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalInsertar()}>Cancelar</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>

      <Modal isOpen={this.state.modalEditar}>
        <ModalHeader>
          <div>
            <h3>Editar Registro</h3>
          </div>
        </ModalHeader>

        <ModalBody>
          <FormGroup>
            <label>Id:</label>
            <input className="form-control" readOnly type="text" value={this.state.form.id}/>
          </FormGroup>

          <FormGroup>
            <label>Contacto</label>
            <input className="form-control" name="contacto" type="text" onChange={this.handleChange} value={this.state.form.contacto}/>
          </FormGroup>

          <FormGroup>
            <label>Telefono</label>
            <input className="form-control" name="telefono" type="text" onChange={this.handleChange} value={this.state.form.telefono}/>
          </FormGroup>

          <ModalFooter>
            <Button color="success" onClick={()=>this.editar(this.state.form)}>Editar</Button>
            <Button color="danger" onClick={()=>this.ocultarModalEditar()}>Cancelar</Button>
          </ModalFooter>
        </ModalBody>
      </Modal>

    </>
  );
  }
}

export default App;
