import { useAuthentication } from "../../hooks/useAuthentication"
import styles from "./Register.module.css"

import { useState, useEffect } from "react"
const Register = () => {

    const [displayName, setDisplayName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setconfirmPassword] = useState("")
    const [error, SetError] = useState("")

    const { createUser, error: authError, loading } = useAuthentication();

    const handleSubmit = async (e) => {
        e.preventDefault()

        SetError("")
        const user = {
            displayName,
            email,
            password
        }

        if (password != confirmPassword) {
            SetError("As senhas não podem ser diferentes!")
            return
        }

        const res = await createUser(user)
        console.log(res)
    }

    useEffect(() => {

        if (authError) {
            SetError(authError)
        }

    }, [authError])
    return (
        <div className={styles.register}>
            <h1>Cadastre-se para postar</h1>
            <p>Crie sua conta e Registre seus momentos</p>
            <form onSubmit={handleSubmit} >
                <label>
                    <span>Nome:</span>
                    <input type="text" name="displayName"
                        required
                        placeholder="Nome do usúario" value={displayName} onChange={(e) => setDisplayName(e.target.value)} />
                </label>
                <label>
                    <span>Email</span>
                    <input type="email" name="email"
                        required
                        placeholder="Digite o seu Email" value={email} onChange={(e) => setEmail(e.target.value)} />
                </label>
                <label>
                    <span>Senha</span>
                    <input type="password" name="password"
                        required
                        placeholder="Digite a sua Senha" value={password} onChange={(e) => setPassword(e.target.value)} />
                </label>
                <label>
                    <span>Confirme a sua senha</span>
                    <input type="password" name="confirmPassword"
                        required
                        placeholder="Digite a senha novamente" value={confirmPassword} onChange={(e) => setconfirmPassword(e.target.value)} />
                </label>
                {!loading && <button className="btn">Cadastrar</button>}
                {loading && <button className="btn" disabled >Aguarde...</button>}

                {error && <p className="error">{error}</p>}

            </form>
        </div>
    )
}

export default Register