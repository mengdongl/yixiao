import styled from "@emotion/styled";
import { Spin, Typography } from "antd";
import { DevTools } from "jira-dev-tool";

export const Row = styled.div<{
  marginRight?: boolean | number;
  marginBottom?: boolean | number;
}>`
  display: flex;
  align-items: center;
  margin-bottom: ${(props) =>
    typeof props.marginBottom === "number"
      ? props.marginBottom + "rem"
      : props.marginBottom
      ? "2rem"
      : "0"};
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

const FullPage = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;
