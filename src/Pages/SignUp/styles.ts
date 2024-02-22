import Background from "../../Assets/images/background-signup.png";
import styled from "styled-components";
import typography from "../../Styles/typography";
import color from "../../Styles/colors";

export const Container = styled.div`
  width: 100%;
  height: 100%;
  font-size: ${typography.font.small};
  color: ${color.white};
  background: url(${Background});
  background-repeat: no-repeat;
  display: flex;
  position: fixed;
  .divBlue {
    background: linear-gradient(0deg, #3f45ea, #3f45ea);
    opacity: 0.94;
    position: absolute;
    height: 100%;
    width: 100%;
    z-index: 0;
  }
  .formSignUp {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100%;
    position: relative;
    z-index: 100;
  }
  .divImage {
    display: flex;
    flex-direction: column;
    justify-content: end;
    position: relative;
    z-index: 100;
  }
  .imgTagna {
    width: 90%;
  }

  .resetPassword {
    color: ${color.white};
    z-index: 100;
    font-size: ${typography.font.small};
    font-family: ${typography.types.inter};
    padding-top: 40;
    padding-bottom: 40;
    margin-right: 20;
    display: flex;
    flex-direction: column;
    justify-content: start;
    position: absolute;
    align-items: end;
    width: 98%;
  }
  .buttonLogin {
    border-style: solid;
    border-width: 1px;
    border-radius: 25px;
    padding: 10px;
    font-family: ${typography.types.regular};
  }

  .textTitle {
    font-family: ${typography.types.regular};
    color: ${color.white};
    font-size: ${typography.font.large};
  }

  .boxRegister {
    margin-top: 30px;
  }

  .link {
    font-family: ${typography.types.bold};
    color: ${color.white};
    text-decoration: none;
    margin-left: 5px;
  }

  .linkRegister {
    margin-top: 30px;
    background-color: ${color.white};
    border: none;
    border-radius: 5px;
    color: ${color.colorsBaseProductNormal};
    font-size: ${typography.font.extraSmall};
    font-family: ${typography.types.bold};
    padding: 10px 20px;
    text-decoration: none;
  }

  @media (max-width: 1300px) {
    .resetPassword {
      display: flex;
      flex-direction: column;
      justify-content: start;
      font-size: 14px;
      position: absolute;
      align-items: end;
      width: 98%;
    }
  }

  @media (max-width: 740px) {
    .divImage {
      width: 100%;
      position: relative;
    }
    .textTitle {
      font-family: ${typography.types.regular};
      color: ${color.white};
      font-size: 25px;
    }
  }

  @media (max-width: 639px) {
    .resetPassword {
      display: flex;
      flex-direction: row;
      justify-content: center;
      align-items: end;
      background: linear-gradient(
        180deg,
        rgba(71, 77, 232, 0) 0%,
        #474de8 100%
      );
      padding: 20px 0px;
      height: 200px;
      position: relative;
      width: 100%;
    }
    .divImage {
      height: 100%;
      margin-top: auto;
      position: absolute;
    }
    .imgTagna {
      width: 460px;
    }
    .textTitle {
      font-family: ${typography.types.normal};
      font-weight: 500;
      color: ${color.white};
      font-size: 42px;
      text-align: center;
    }
    .formSignUp {
      justify-content: start;
      margin-top: 25vh;
    }
    .box{
        flex-direction: column;
    }
    @media (max-height: 700px) {
      .formSignUp {
        margin-top: 10vh;
      }
    }
  }

  @media (max-width: 1020px) {
    .divImage {
      width: 70%;
    }
    .textTitle {
      font-family: ${typography.types.regular};
      color: ${color.white};
      font-size: 25px;
    }
    .imageLoginStyle {
      width: 100%;
      margin-left: 20%;
    }
  }
`;