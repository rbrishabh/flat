import "./style.less";

import React from "react";
import { observer } from "mobx-react-lite";
import { EditRoomBody, EditRoomBodyProps, MainPageHeader } from "flat-components";
import { MainPageLayoutContainer } from "../MainPageLayoutContainer";
import { useHistory } from "react-router";

export type EditRoomPageProps = EditRoomBodyProps;

export const EditRoomPage = observer<EditRoomPageProps>(function EditRoomPage(props) {
    const history = useHistory();

    return (
        <MainPageLayoutContainer>
            <div className="edit-room-page">
                <div className="edit-room-page-header-container">
                    <MainPageHeader
                        onBackPreviousPage={() => history.goBack()}
                        title={
                            <span className="edit-room-page-header-title">
                                {props.type === "schedule" ? "预定房间" : "修改房间"}
                            </span>
                        }
                    />
                </div>
                <div className="edit-room-page-body">
                    <EditRoomBody {...props} />
                </div>
            </div>
        </MainPageLayoutContainer>
    );
});

export default EditRoomPage;
