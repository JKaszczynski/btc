package com.jkaszczynski.btc.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jkaszczynski.btc.dtos.GroupBasic;
import com.jkaszczynski.btc.entities.Group;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.GroupRepository;
import com.jkaszczynski.btc.repositories.TopicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class GroupControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private GroupRepository groupRepository;

    private Long topicId;

    @BeforeEach
    public void init() {
        topicId = topicRepository.save(new Topic()).getId();
        groupRepository.deleteAll();
    }

    @Test
    void whenNewGroupCreated_thenReturnGroupDetails() throws Exception {
        mockMvc.perform(post("/topic/" + topicId)
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createGroupBasic())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("id").isNumber())
                .andExpect(jsonPath("topic.id").isNumber())
                .andExpect(jsonPath("name").isString());
    }

    private GroupBasic createGroupBasic() {
        GroupBasic groupBasic = new GroupBasic();
        groupBasic.setTopicId(topicId);
        groupBasic.setName("Test1");
        return groupBasic;
    }

    @Test
    void givenTopicWithGroups_whenGroupsRequested_thenReturnEveryGroupInTopic() throws Exception {
        groupRepository.save(createGroup("test1"));
        groupRepository.save(createGroup("test2"));
        groupRepository.save(createGroup("test3"));
        groupRepository.save(createGroup("test4"));
        groupRepository.save(createGroup("test5"));

        mockMvc.perform(get("/topic/" + topicId))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].name").isString())
                .andExpect(jsonPath("$[0].id").isNumber())
                .andExpect(jsonPath("$[0].topicId").isNumber());
    }

    private Group createGroup(String groupName) {
        Group group = new Group();
        Topic topic = new Topic();
        topic.setId(topicId);
        group.setTopic(topic);
        group.setName(groupName);
        group.setVotes(0L);
        return group;
    }

    @Test
    void givenExistingGroup_whenNewVote_thenReturnOkStatus() throws Exception {
        Group group = groupRepository.save(createGroup("test1"));

        mockMvc.perform(post("/topic/" + topicId + "/vote/" + group.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk());
    }
}
