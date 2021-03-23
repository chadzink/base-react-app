import React, { FC, ReactElement, useState } from "react";

type HeaderProps = {
    title: string,
}

const PrimaryHeader: FC<HeaderProps> = ({title = "default"}): ReactElement => {
    const [headerTitle, setHeaderTitle] = useState<string>(title);

    return (
        <header>
            {headerTitle}
        </header>
    );
};

export default PrimaryHeader;