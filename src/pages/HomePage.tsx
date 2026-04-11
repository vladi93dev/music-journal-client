import { useAuth } from "../context/AuthContext"

export default function HomePage() {
    const { user } = useAuth();

    console.log(user);
    return (
        <div>Home Page</div>
    )
};

