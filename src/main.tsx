import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import './index.css'
import {QueryClient, QueryClientProvider} from "react-query";
import {Toaster} from "react-hot-toast";
import {ReactQueryDevtools} from "react-query/devtools";
import {BrowserRouter} from "react-router-dom";

export const queryClient = new QueryClient();

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <QueryClientProvider client={queryClient}>
                <Toaster/>
                <App/>
                <ReactQueryDevtools/>
            </QueryClientProvider>
        </BrowserRouter>
    </StrictMode>,
)
