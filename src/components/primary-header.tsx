import { FC, ReactElement } from "react";

type HeaderProps = {
    title: string,
}

const defaultHeaderProps : HeaderProps = {
    title: "default",
}

const PrimaryHeader: FC<HeaderProps> = (props: HeaderProps = defaultHeaderProps): ReactElement => {
    const { title } = props;

    return (
        <header>
            Secure Area: {title}
        </header>
    );
};

export default PrimaryHeader;