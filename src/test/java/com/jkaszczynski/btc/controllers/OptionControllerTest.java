package com.jkaszczynski.btc.controllers;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.jkaszczynski.btc.dtos.OptionBasic;
import com.jkaszczynski.btc.entities.Option;
import com.jkaszczynski.btc.entities.Topic;
import com.jkaszczynski.btc.repositories.OptionRepository;
import com.jkaszczynski.btc.repositories.TopicRepository;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Collections;
import java.util.List;

import static org.hamcrest.collection.IsCollectionWithSize.hasSize;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.post;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;

@SpringBootTest
@AutoConfigureMockMvc
public class OptionControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    @Autowired
    private TopicRepository topicRepository;

    @Autowired
    private OptionRepository optionRepository;

    private Long topicId;

    @BeforeEach
    public void init() {
        topicId = topicRepository.save(new Topic()).getId();
        optionRepository.deleteAll();
    }

    @Test
    void whenNewOptionCreated_thenReturnOptionDetails() throws Exception {
        mockMvc.perform(post("/topic/" + topicId + "/options")
                .contentType(MediaType.APPLICATION_JSON)
                .content(objectMapper.writeValueAsString(createOptionBasic())))
                .andExpect(status().isCreated())
                .andExpect(jsonPath("[0].id").isNumber())
                .andExpect(jsonPath("[0].topic.id").isNumber())
                .andExpect(jsonPath("[0].value").isString());
    }

    private List<OptionBasic> createOptionBasic() {
        OptionBasic optionBasic = new OptionBasic();
        optionBasic.setTopicId(topicId);
        optionBasic.setValue("Test1");
        return Collections.singletonList(optionBasic);
    }

    @Test
    void givenTopicWithOptions_whenOptionsRequested_thenReturnEveryOptionInTopic() throws Exception {
        optionRepository.save(createOption("test1"));
        optionRepository.save(createOption("test2"));
        optionRepository.save(createOption("test3"));
        optionRepository.save(createOption("test4"));
        optionRepository.save(createOption("test5"));

        mockMvc.perform(get("/topic/" + topicId + "/options"))
                .andExpect(status().isOk())
                .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(jsonPath("$", hasSize(5)))
                .andExpect(jsonPath("$[0].value").isString())
                .andExpect(jsonPath("$[0].id").isNumber())
                .andExpect(jsonPath("$[0].topicId").isNumber());
    }

    private Option createOption(String optionName) {
        Option option = new Option();
        Topic topic = new Topic();
        topic.setId(topicId);
        option.setTopic(topic);
        option.setValue(optionName);
        option.setVotes(0L);
        return option;
    }

    @Test
    void givenExistingOption_whenNewVote_thenReturnTheOption() throws Exception {
        Option option = optionRepository.save(createOption("test1"));

        mockMvc.perform(post("/topic/" + topicId + "/vote/" + option.getId())
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("id").isNumber())
                .andExpect(jsonPath("votes").isNumber());
    }
}
