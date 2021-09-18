import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  marginRight?: boolean | number;
  marginBottom?: boolean | number;
  between?:boolean;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    typeof props.marginBottom === "number"
      ? props.marginBottom + "rem"
      : props.marginBottom
      ? "2rem"
      : "0"};
  justify-content: ${props => props.between?'space-between':''};
  & > * {
    margin-right: ${(props) =>
      typeof props.marginRight === "number"
        ? props.marginRight + "rem"
        : props.marginRight
        ? "3rem"
        : "0rem"};
    margin-top: 0 !important;
    margin-bottom: 0 !important;
  }
`;

export const FullPageLoading = () => {
  return (
    <FullPage>
      <Spin></Spin>
    </FullPage>
  );
};

export const FullPageError = ({ error }: { error: Error | null }) => (
  <FullPage>
    <DevTools></DevTools>
    <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
  </FullPage>
);

export const ErrorBox = ({error}:{error:Error | undefined}) => {
  if(!error) return null
  return <Typography.Text type={"danger"}>{error?.message}</Typography.Text>
}

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const ScreenContainer = styled.div`
  padding: 3.2rem;
  width: 100%;
  display: flex;
  flex-direction: column;
`;
