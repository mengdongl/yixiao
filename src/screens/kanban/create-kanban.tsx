import { Input } from "antd"
import { useState } from "react"
import { useAddKanban } from "utils/kanban"
import { Container } from "./kanban-column"
import { useKanbansQueryKey, useProjectIdInUrl } from "./utils"

export const CreateKanban = () => {
    const [name,setName] = useState('')
    const {mutateAsync:addKanban} = useAddKanban(useKanbansQueryKey())
    const projectId = useProjectIdInUrl()
    const submit = async () => {
        await addKanban({projectId,name})
        setName('')
    }
    return <Container>
        <Input
        size={"large"}
        placeholder={"新建看板名称"}
        onPressEnter={submit}
        value={name}
        onChange={(evt) => setName(evt.target.value)}
      />
    </Container>
}