import "./Panel.css";
import { IoTrashBinSharp } from "react-icons/io5"; // 

export default function Panel({ registerData, onDeleteRegister }) {
  return (
    <div className="panel-container">
      <table>
        <thead>
          <tr>
            <th>Win/Loss</th>
            <th>Date</th>
            <th>Hour</th>
            <th>MMR</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {registerData.length > 0 ? (
            [...registerData].reverse().map((data, index) => (
              <tr key={index}>
                <td style={{ color: data.status === "Win" ? "green" : "red", fontWeight: "bolder" }}>
                  {data.status}
                </td>
                <td>{data.date}</td>
                <td>{data.time}</td>
                <td style={{ color: data.status === "Win" ? "green" : "red", fontWeight: "bolder" }}>
                  {data.mmrChange}
                </td>
                <td>
                  <span className="delete-icon" onClick={() => onDeleteRegister(index)}>
                    <IoTrashBinSharp />
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" style={{ textAlign: "center" }}>
                Nenhum registro encontrado.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}
