import { useNavigate } from 'react-router-dom';

export function useNavigateTo() {
 const navigate = useNavigate();
 const navigateTo = (url: string, t: number, opts?: any) => setTimeout(() => navigate(url, { ...opts }), t);
 return navigateTo
}