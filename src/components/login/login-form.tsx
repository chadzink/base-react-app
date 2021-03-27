import { FC, FormEvent, ReactElement, useContext, useState } from 'react';
import { SessionContext, ISessionContextState } from '../../context';
import { useHistory } from 'react-router-dom';

type ILoginFormState = {
    username: string;
    password: string;
}

const defaultLoginFormState: ILoginFormState = {
    username: 'chadzink',
    password: 'password',
}

const LoginForm : FC = () : ReactElement => {
    const session : ISessionContextState = useContext<ISessionContextState>(SessionContext);
    const [formData, setFormData] = useState<ILoginFormState>(defaultLoginFormState);
    let history = useHistory();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({...formData, [e.target.name]: e.target.value})
    }

    const handleLoginSubmit = async (e: FormEvent<HTMLFormElement>): Promise<void> => {
        e.preventDefault();

        // to do check if form is valid
        const submitSuccess: boolean = await submitForm(formData.username, formData.password);
        if (submitSuccess) {
            history.push(session.appStartUrl);
        }
    };

    const submitForm = async (username:string, password:string) : Promise<boolean> => {
        const loginUser = await session.authenticate(username,password);
        return (
            loginUser !== null
            && loginUser.username === username
            && loginUser.access_token !== ''
        );
    };

    return (
        <div>
            {session.loading || session.isAuthenticated ? (
                <span>Loading...</span>
            ) : (
                <form onSubmit={handleLoginSubmit}>
                    <p>
                        User Name:
                        <input type='text' name='username' value={formData.username} onChange={handleChange} />
                    </p>
                    <p>
                        Password: <input type='password' name='password' value={formData.password} onChange={handleChange} />
                    </p>
                    <input type="submit" value="Login" />
                </form>
            )}
        </div>
    );
};

export default LoginForm;