import React from "react";
import {FC} from "react";
import styled from "@emotion/styled";

const SampleDiv = styled.div`
    margin-top: 100px
`

const Sample: FC = () => {
    return (
        <SampleDiv>
            Sample Component
        </SampleDiv>
    );
};

export default Sample;