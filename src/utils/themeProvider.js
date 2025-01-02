"use client"
const { createContext, useContext, useState, useEffect } = require("react");

const ThemeContext = createContext();

export function ThemeProvider({children}){
    const [theme,setTheme] = useState("light");
    useEffect(() => {
        const storedTheme = localStorage.getItem('theme');
        if (storedTheme) {
          setTheme(storedTheme);  
        }
    }, []);

    const handleTheme = () => {
        setTheme((prevTheme) => {
          const newTheme = prevTheme === 'light' ? 'dark' : 'light'; 
          localStorage.setItem('theme', newTheme);
          return newTheme;
        });
      };
    return (
        <ThemeContext.Provider value={{theme,handleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}

export const useTheme = ()=>{
    return useContext(ThemeContext);
}