function requestNF(nfinfo) {
    axios.get("https://bj6dn2sdt8.execute-api.us-east-1.amazonaws.com/demo/requestNF", {headers: {Authorization: localStorage.id_Token, NFInfo: nfinfo}})
    .then(response => alert(response.data))
}


function Header({person}){
    return (
        <nav>
            <img src="https://cdn-icons-png.flaticon.com/512/2966/2966327.png" className="nav--icon"/>
            <h3 className="nav--logo_text"> AnyCompany</h3>  
            <h4 className="nav--title"> Bem vindo, {person.name} </h4>  
        </nav>
    )
}

function MainContent({person}) {
    const { useState, useEffect } = React
    const [appointments, setAppointments] = useState([])

    useEffect(() => {
            axios
            .get(
                "https://bj6dn2sdt8.execute-api.us-east-1.amazonaws.com/demo/myAppointments", {headers: {user_mail: person.user_email}}
            )
            .then(res => {
                    setAppointments(res.data)
                }
            )
        }, []
    )  
    const data = appointments

    data.map(d => {
        // Ajustando a data
        var timestamp = d.date;
        var date = new Date(timestamp * 1000);

        var year = date.getFullYear();
        var month = date.getMonth() + 1;
        var day = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var seconds = date.getSeconds();
        d.date = day + "/" + month + "/" + year + " " + hours + ":" + minutes + ":" + seconds;
        }
    )

    return (
        <div>
            <h1> Aqui estão seus agendamentos anteriores </h1>
            <table id="appointments">
                <thead>
                    <tr> 
                        <th>Nome do paciente</th>
                        <th>Especialidade do atendimento</th>
                        <th>Médico Responsável</th>
                        <th>Data do atendimento</th>
                        <th>Preço da consulta</th>
                        <th>Solicitar nota fiscal</th>
                    </tr>
                </thead>
            
            {data.map(user => (<tr key={user.user_email}><td>{user.patient_name}</td><td>{user.medical_specialty}</td><td>{user.doctor}</td><td>{user.date}</td><td>R$ {user.price}</td><td><button className="btn" onClick={() => requestNF([user.patient_name, user.medical_specialty, user.date, user.price, user_email])}><i class="fa fa-download"></i>Baixar</button></td></tr>))}
            </table>
        </div>

    );
}

function App(){
    const user = localStorage.getItem("loggedUser")
    const user_email = localStorage.getItem("user_email")
    return (
        <div>
             <Header person={{name: user, user_email: user_email}}/>
             <MainContent person={{name: user, user_email: user_email}}/>
        </div>
    )
}





ReactDOM.createRoot(document.getElementById("root")).render(<App/>)