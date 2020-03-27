package com.jkaszczynski.btc.services;

import com.jkaszczynski.btc.entities.Group;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.GroupRepository;
import com.jkaszczynski.btc.repositories.TopicRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class GroupServiceTest {
    @Autowired
    private GroupRepository groupRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private GroupService groupService;

    private Long topicId;

    @BeforeEach
    public void init() {
        topicId = topicRepository.save(new Topic()).getId();
        groupRepository.deleteAll();
    }

    @Test
    void givenExistingGroup_whenVoted_thenVoteIncreased() {
        Group group = groupRepository.save(createGroup());
        groupService.vote(group.getId());
        Group groupAfterVoting = groupRepository.findById(group.getId()).orElseThrow();
        Assertions.assertEquals(1, groupAfterVoting.getVotes());
    }

    private Group createGroup() {
        Group group = new Group();
        Topic topic = new Topic();
        topic.setId(topicId);
        group.setTopic(topic);
        group.setName("test");
        group.setVotes(0L);
        return group;
    }
}
