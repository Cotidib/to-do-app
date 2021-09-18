import { createGlobalStyle } from "styled-components";

export const GlobalStyles = createGlobalStyle`
    :root{
        --bg: ${({theme})=>theme.backg};
        --lines-color: ${({theme})=>theme.lines};
        --task-box-color: ${({theme})=>theme.task};
        --task-done-box-color: ${({theme})=>theme.taskdone};
        --text-color: ${({theme})=>theme.text};
        --gradient: linear-gradient(145deg, rgba(87,221,255,1) 0%, rgba(233,189,255,1) 100%);
        --filter-hover:${({theme})=>theme.fhover};
        --title-color: white;
        --footer-color: hsl(233, 14%, 35%);
    }
      
`;

export const lightTheme = {
    backg: 'hsl(236, 33%, 92%)',
    text: '#222222',
    lines: 'hsl(236, 9%, 61%)',
    task: 'white',
    taskdone: 'white',
    fhover: 'black',
};

export const darkTheme = {
    backg: 'hsl(235, 21%, 11%)',
    text: 'hsl(234, 39%, 85%)',
    lines: 'hsl(233, 14%, 35%)',
    task: 'hsl(235, 24%, 19%)',
    taskdone: 'hsl(234, 24%, 15%)',
    fhover: 'white',

};