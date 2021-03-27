import { FC, ReactElement } from "react";

type IHeaderProps = {
    title: string,
}

const defaultHeaderProps : IHeaderProps = {
    title: "default",
}

const PublicHeader: FC<IHeaderProps> = (props: IHeaderProps = defaultHeaderProps): ReactElement => {
    const { title } = props;

    return (
        <header>
            Public Area: {title}
        </header>
    );
};

export default PublicHeader;