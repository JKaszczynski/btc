package com.jkaszczynski.btc.services;

import com.jkaszczynski.btc.dtos.GroupBasic;
import com.jkaszczynski.btc.entities.Group;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.GroupRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class GroupService {
    private GroupRepository groupRepository;

    public GroupService(GroupRepository groupRepository) {
        this.groupRepository = groupRepository;
    }

    public List<Group> addAll(Long topicId, List<GroupBasic> groupsBasics) {
        List<Group> groups = groupsBasics.stream().map(g -> asEntity(g, topicId)).collect(Collectors.toList());
        return groupRepository.saveAll(groups);
    }

    private Group asEntity(GroupBasic groupBasic, Long topicId) {
        Group group = new Group();
        group.setName(groupBasic.getName());
        Topic topic = new Topic();
        topic.setId(topicId);
        group.setTopic(topic);
        group.setVotes(0L);
        return group;
    }

    public List<GroupBasic> getAll(Long topicId) {
        List<Group> groups = groupRepository.findAllByTopicId(topicId);
        return groups.stream().map(GroupBasic::of).collect(Collectors.toList());
    }

    public void vote(Long groupId) {
        Group group = groupRepository.findById(groupId).orElseThrow();
        group.setVotes(group.getVotes() + 1);
        groupRepository.save(group);
    }
}
