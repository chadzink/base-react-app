import { FC, ReactElement } from "react";

type HeaderProps = {
    title: string,
}

const defaultHeaderProps : HeaderProps = {
    title: "default",
}

const PublicHeader: FC<HeaderProps> = (props: HeaderProps = defaultHeaderProps): ReactElement => {
    const { title } = props;

    return (
        <header>
            Public Area: {title}
        </header>
    );
};

export default PublicHeader;