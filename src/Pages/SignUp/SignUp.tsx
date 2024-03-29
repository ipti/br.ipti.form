import { Link } from "react-router-dom";
import Tagna from "../../Assets/images/signup.svg";
import { Container } from "./styles";
import { Padding, Row } from "../../Styles/styles";


const SignUp = () => {
  return (
    <div className="row align-items--center">
      <Container>
        <Row reverse={true} className="box" style={{ width: "100%" }}>
          <div className="divBlue" />
          {/* <div className="divImage">
            <img className="imgTagna" src={Tagna} alt="" />
          </div> */}
          <div className="formSignUp">
            <img className="imgLogo" src={Tagna} alt="" />
            <Padding padding="16px"/>
            <div className="textTitle">
              <div>Bem-Vindo</div>
              <div>ao Matrícula Online</div>
              <div className="boxRegister">
                <div>
                  <Link className="linkRegister" to="/matricula">
                    Iniciar Matrícula
                  </Link>
                </div>
              </div>
            </div>
          </div>
          <div className="resetPassword textCenter">
            <div className="buttonLogin">
              Faça o seu Login
              <Link className="link" to="/login">
                clique aqui
              </Link>
            </div>
          </div>
        </Row>
      </Container>
    </div>
  );
};

export default SignUp;
