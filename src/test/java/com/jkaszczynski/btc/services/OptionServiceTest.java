package com.jkaszczynski.btc.services;

import com.jkaszczynski.btc.entities.Option;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.OptionRepository;
import com.jkaszczynski.btc.repositories.TopicRepository;
import org.junit.jupiter.api.Assertions;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;

@SpringBootTest
public class OptionServiceTest {
    @Autowired
    private OptionRepository optionRepository;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private OptionService optionService;

    private Long topicId;

    @BeforeEach
    public void init() {
        topicId = topicRepository.save(new Topic()).getId();
        optionRepository.deleteAll();
    }

    @Test
    void givenExistingOption_whenVoted_thenVoteIncreased() {
        Option option = optionRepository.save(createOption());
        optionService.vote(option.getId());
        Option optionAfterVoting = optionRepository.findById(option.getId()).orElseThrow();
        Assertions.assertEquals(1, optionAfterVoting.getVotes());
    }

    private Option createOption() {
        Option option = new Option();
        Topic topic = new Topic();
        topic.setId(topicId);
        option.setTopic(topic);
        option.setValue("test");
        option.setVotes(0L);
        return option;
    }
}
