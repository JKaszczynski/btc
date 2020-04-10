package com.jkaszczynski.btc.services;

import com.jkaszczynski.btc.dtos.OptionBasic;
import com.jkaszczynski.btc.entities.Option;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.OptionRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class OptionService {
    private OptionRepository optionRepository;

    public OptionService(OptionRepository optionRepository) {
        this.optionRepository = optionRepository;
    }

    public List<Option> addAll(Long topicId, List<OptionBasic> optionsBasics) {
        List<Option> options = optionsBasics.stream().map(g -> asEntity(g, topicId)).collect(Collectors.toList());
        return optionRepository.saveAll(options);
    }

    private Option asEntity(OptionBasic optionBasic, Long topicId) {
        Option option = new Option();
        option.setValue(optionBasic.getValue());
        Topic topic = new Topic();
        topic.setId(topicId);
        option.setTopic(topic);
        option.setVotes(0L);
        return option;
    }

    public List<OptionBasic> getAll(Long topicId) {
        List<Option> options = optionRepository.findAllByTopicId(topicId);
        return options.stream().map(OptionBasic::of).collect(Collectors.toList());
    }

    public OptionBasic vote(Long optionId) {
        Option option = optionRepository.findById(optionId).orElseThrow();
        option.setVotes(option.getVotes() + 1);
        return OptionBasic.of(optionRepository.save(option));
    }
}
