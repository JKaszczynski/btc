package com.jkaszczynski.btc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jkaszczynski.btc.entities.Group;
import lombok.Data;

@Data
public class GroupBasic {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private Long topicId;

    private String name;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long votes;

    public static GroupBasic of(Group group) {
        GroupBasic groupBasic = new GroupBasic();
        groupBasic.setId(group.getId());
        groupBasic.setName(group.getName());
        groupBasic.setTopicId(group.getTopic().getId());
        groupBasic.setVotes(group.getVotes());
        return groupBasic;
    }
}
