package com.jkaszczynski.btc.services;

import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.TopicRepository;
import org.springframework.stereotype.Service;

@Service
public class TopicService {

    private TopicRepository topicRepository;

    public TopicService(TopicRepository topicRepository) {
        this.topicRepository = topicRepository;
    }

    public Topic add(String name) {
        Topic topic = new Topic();
        topic.setName(name);
        return topicRepository.save(topic);
    }

    public Topic getTopic(Long id) {
        return topicRepository.findById(id).orElseThrow();
    }
}
