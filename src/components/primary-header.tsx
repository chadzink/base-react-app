import { FC, ReactElement } from "react";

type IHeaderProps = {
    title: string,
}

const defaultHeaderProps : IHeaderProps = {
    title: "default",
}

const PrimaryHeader: FC<IHeaderProps> = (props: IHeaderProps = defaultHeaderProps): ReactElement => {
    const { title } = props;

    return (
        <header>
            Secure Area: {title}
        </header>
    );
};

export default PrimaryHeader;