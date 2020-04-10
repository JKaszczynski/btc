package com.jkaszczynski.btc.dtos;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.jkaszczynski.btc.entities.Option;
import lombok.Data;

@Data
public class OptionBasic {

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private Long id;

    private Long topicId;

    private String value;

    @JsonProperty(access = JsonProperty.Access.READ_ONLY)
    private long votes;

    public static OptionBasic of(Option option) {
        OptionBasic optionBasic = new OptionBasic();
        optionBasic.setId(option.getId());
        optionBasic.setValue(option.getValue());
        optionBasic.setTopicId(option.getTopic().getId());
        optionBasic.setVotes(option.getVotes());
        return optionBasic;
    }
}
