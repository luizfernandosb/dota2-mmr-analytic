import { useState, useEffect } from "react";
import "./App.css";
import Panel from "./components/Panel";
import Logo from "./assets/dota2_logo_symbol.png";
import { FaPlus } from "react-icons/fa";

function App() {
  const [registerData, setRegisterData] = useState([]); // Mudei para uma lista
  const [inputValue, setInputValue] = useState("");
  const [currentMMR, setCurrentMMR] = useState(0); // Inicializa como 0
  const [mmrHistory, setMmrHistory] = useState([]); // Para armazenar o histórico do MMR

  // Ler dados do localStorage ao inicializar
  useEffect(() => {
    const storedData = localStorage.getItem("registerData");
    if (storedData) {
      const parsedData = JSON.parse(storedData);
      setRegisterData(parsedData);
      // Estabelecer o MMR atual baseado no último registro
      const lastMMR =
        parsedData.length > 0 ? parsedData[parsedData.length - 1].mmrChange : 0;
      setCurrentMMR(lastMMR);
      setMmrHistory(parsedData.map((data) => data.mmrChange)); // Armazenar o histórico
    }
  }, []);

  const handleInputChange = (event) => {
    setInputValue(event.target.value); // Atualiza o valor do input
  };

  const handleNewRegister = () => {
    const value = parseInt(inputValue); // Converte o valor do input para um número

    // Verifica se o valor é um número
    if (isNaN(value)) {
      console.log("Por favor, insira um número válido.");
      return;
    }

    const today = new Date();
    const hours = today.getHours();
    const minutes = today.getMinutes();
    const seconds = today.getSeconds();
    const dayOfMonth = today.getDate();
    const month = today.getMonth();
    const year = today.getFullYear();

    const months = [
      "Janeiro",
      "Fevereiro",
      "Março",
      "Abril",
      "Maio",
      "Junho",
      "Julho",
      "Agosto",
      "Setembro",
      "Outubro",
      "Novembro",
      "Dezembro",
    ];

    const handleMonth = (month) => months[month];

    // Criando objeto com os dados para o novo registro
    const newData = {
      status: `${value > currentMMR ? "Win" : "Loss"}`,
      time: `${hours < 10 ? `0${hours}` : hours}:${minutes < 10 ? `0${minutes}` : minutes}:${seconds < 10 ? `0${seconds}` : seconds}`,
      date: `${dayOfMonth} ${handleMonth(month)} ${year}`,
      mmrChange: value > currentMMR ? `+${value}` : `-${value}`, // Adiciona + ou - ao valor do MMR
    };

    // Atualiza o estado com o novo registro
    const updatedRegisterData = [...registerData, newData];
    setRegisterData(updatedRegisterData);

    // Atualiza o localStorage
    localStorage.setItem("registerData", JSON.stringify(updatedRegisterData));

    setCurrentMMR(value); // Atualiza o currentMMR com o valor atual
    setMmrHistory((prev) => [...prev, value]); // Adiciona ao histórico
    setInputValue(""); // Limpa o input após o registro
  };

  const handleDeleteRegister = (index) => {
    // Cria uma nova lista removendo o registro no índice especificado
    const updatedRegisterData = [...registerData];
    updatedRegisterData.splice(updatedRegisterData.length - 1 - index, 1); // Remove o registro correto

    setRegisterData(updatedRegisterData);

    // Atualiza o localStorage
    localStorage.setItem("registerData", JSON.stringify(updatedRegisterData));

    // Se houver um histórico, retorne ao último MMR registrado
    if (updatedRegisterData.length > 0) {
      const lastMMR =
        updatedRegisterData[updatedRegisterData.length - 1].mmrChange;
      setCurrentMMR(lastMMR);
    } else {
      setCurrentMMR(0); // Se não houver registros, zere o MMR
    }
  };

  return (
    <div className="main-container">
      <div
        className="top-bar"
        style={{
          display: "flex",
          justifyContent: "space-between",
          width: "100%",
          height: "50px",
          alignItems: "center",
          color: "whitesmoke",
        }}
      >
        <div
          className="logo"
          style={{ display: "flex", alignItems: "center", gap: 10 }}
        >
          <img src={Logo} alt="" style={{ width: 50 }} />
          <p>MMR Analytic</p>
        </div>
        <div
          style={{
            display: "flex",
            alignContent: "center",
            alignItems: "center",
            position: "relative", // Adiciona position relative para o container
          }}
        >
          <input
            value={inputValue}
            type="text"
            placeholder="Fazer novo registro"
            style={{
              height: 40,
              borderRadius: 10,
              outline: "none",
              border: "1px solid #ccc", // Borda sutil
              padding: "10px 15px",
              transition: "border-color 0.3s, box-shadow 0.3s", // Transição suave
              boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)", // Sombra
            }}
            onChange={handleInputChange} // Atualiza o estado quando o usuário digita
            onFocus={(e) => (e.target.style.borderColor = "#007BFF")} // Muda a cor da borda ao focar
            onBlur={(e) => (e.target.style.borderColor = "#ccc")} // Restaura a cor da borda ao desfocar
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                handleNewRegister(); // Chama a função ao pressionar Enter
              }
            }} // Adiciona o evento onKeyDown
          />
          <FaPlus
            style={{
              position: "absolute",
              left: "calc(100% - 35px)", // Ajusta a posição com base na largura do input
              color: "#007BFF", // Muda a cor do ícone
              cursor: "pointer",
              transition: "color 0.3s", // Transição suave para hover
            }}
            onClick={handleNewRegister} // Chama a função ao clicar
            onMouseEnter={(e) => (e.target.style.color = "#0056b3")} // Cor ao passar o mouse
            onMouseLeave={(e) => (e.target.style.color = "#007BFF")} // Restaura a cor ao sair
            onMouseDown={(e) => (e.target.style.color = "#003d7a")} // Cor ao clicar
            onMouseUp={(e) => (e.target.style.color = "#0056b3")} // Cor ao soltar o clique
          />
        </div>

        <p>
          MMR: <span style={{ fontWeight: 'bolder', color: "yellow" }}>{currentMMR}</span>
        </p>
      </div>
      <Panel
        registerData={registerData}
        onDeleteRegister={handleDeleteRegister}
      />{" "}
      {/* Passa a lista como prop e a função de deletar */}
    </div>
  );
}

export default App;
