import axios from "axios";
import { Buffer } from 'buffer'; 


export const gerarIdAleatorio = (tamanho: number) => {
  const caracteres =
    "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  let id = "";

  for (let i = 0; i < tamanho; i++) {
    const indiceAleatorio = Math.floor(Math.random() * caracteres.length);
    id += caracteres.charAt(indiceAleatorio);
  }

  return id;
};

export function formatarData(data: string): string {
  var date = data.toString().split("T")[0];
  var dataEdit = date.split("-").reverse().join("/");
  return dataEdit;
}

export function converterData(data: string) {
  // Divide a string pelo separador "/"
  const partes = data.split('/');
  
  // As partes serão: partes[0] = dia, partes[1] = mês, partes[2] = ano
  const dia = partes[0];
  const mes = partes[1];
  const ano = partes[2];
  
  // Reorganiza no formato YYYY-MM-DD
  const dataFormatada = `${ano}-${mes}-${dia}`;
  
  return dataFormatada;
}

export function somarNumeros(num1: number, num2: number): number {


  return parseInt(`${num1 + num2}`);
}

export const VerifySex = (sex: number) => {
  return typesex.find((props) => props.id === sex);
};

export const VerifyColor = (color_race_number: number) => {
  return color_race.find((props) => props.id === color_race_number);
};

export const getStatus = (id: string) => {
  const status = [
    { id: Status.APPROVED, name: "Aprovado" },
    { id: Status.REPROVED, name: "Reprovado" },
    { id: Status.PENDING, name: "Pedente" },
  ];
  return status.find((props) => props.id === id);
};

export var typesex = [
  { id: 0, type: "Não Declarada" },
  { id: 2, type: "Feminino" },
  { id: 1, type: "Masculino" },
];

export const color_race = [
  { id: 0, name: "Não Declarada" },
  { id: 1, name: "Branca" },
  { id: 2, name: "Preta" },
  { id: 3, name: "Parda" },
  { id: 4, name: "Amarela" },
  { id: 5, name: "Indígena" },
];

export const Status = {
  APPROVED: "APPROVED",
  PENDING: "PENDING",
  REPROVED: "REPROVED",
};

export const ROLE = {
  ADMIN: "ADMIN",
  USER: "USER",
  REAPPLICATORS: "REAPPLICATORS",
  COORDINATORS: "COORDINATORS",
};

export const kinship = [
  { id: "PAI", name: 'Pai' },
  { id: "MAE", name: 'Mãe' },
  { id: "PRIMO_A", name: 'Primo(a)' },
  { id: "TIO_A", name: 'Tio(a)' },
  { id: "FILHO_A", name: 'Filho(a)' },
  { id: "IRMAO_A", name: 'Irmão(a)' },
  { id: "OUTRO", name: 'Outro' },
  { id: "NAO_PARENTE", name: 'Não Parente' },
  { id: "NAO_DEFINIDO", name: 'Não Definido' }

]

export const loadImageFileAsBase64 = (imagePath: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    fetch(imagePath)
      .then((response) => response.blob())
      .then((blob) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          resolve(reader.result as string);
        };
        reader.onerror = reject;
        reader.readAsDataURL(blob);
      })
      .catch(reject);
  });
};


export const convertImageUrlToBase64 = async (imageUrl: string): Promise<string> => {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const base64 = Buffer.from(response.data, 'binary').toString('base64');
    const mimeType = response.headers['content-type'];
    return `data:${mimeType};base64,${base64}`;
  } catch (error: any) {
    throw new Error(`Failed to convert image to Base64: ${error.message}`);
  }
};